'use client';

import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import SelectIndustruy from '@/components/customs/SelectIndustruy';
import SelectCompanySize from '@/components/customs/SelectCompanySize';
import SelectCountry from '@/components/customs/SelectCountry';
import SelectTimezone from '@/components/customs/SelectTimeZone';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

import { Plus } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '@/context/UserProvider';
import toast from 'react-hot-toast';

import { createOrg } from '@/actions/createOrganization';
import { Spinner } from '@/components/ui/spinner';
import { uploadLogo } from '@/actions/uploadLogo';

interface FormErrors {
  organizationName?: string;
  orgDescription?: string;
  orgUrl?: string;
  address?: string;
  companySize?: string;
  industry?: string;
  timeZone?: string;
  country?: string;
}

const Page = () => {
  const [organizationName, setOrganizationName] = useState('');
  const [orgDescription, setOrgDescription] = useState('');
  const [orgUrl, setOrgUrl] = useState('');
  const [address, setAddress] = useState('');
  const [companySize, setCompanySize] = useState<
    'SMALL' | 'MEDIUM' | 'LARGE' | 'ENTERPRISE' | ''
  >('');
  const [industry, setIndustry] = useState<string>('');
  const [timeZone, setTimeZone] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setLoading] = useState<boolean>(false);

  const [file, setFile] = useState<File | null>(null);

  const user = useUser();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File = e.target.files?.[0] as File;
    if (!file) return;
    if (!file.type.startsWith('image'))
      return toast.error('Only images are allowed');
    if (file.size > 1024 * 1024) return toast.error('Max size per image : 2MB');
    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   setAvatarurl(reader.result as string);
    // };
    // reader.readAsDataURL(file);
    setFile(file);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field validation
    if (!organizationName.trim()) {
      newErrors.organizationName = 'Organization name is required';
    } else if (organizationName.trim().length < 3) {
      newErrors.organizationName =
        'Organization name must be at least 3 characters';
    }

    if (!orgDescription.trim()) {
      newErrors.orgDescription = 'Description is required';
    } else if (orgDescription.trim().length < 10) {
      newErrors.orgDescription = 'Description must be at least 10 characters';
    }

    if (!orgUrl.trim()) {
      newErrors.orgUrl = 'URL is required';
    } else {
      // Basic URL validation
      const urlPattern =
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlPattern.test(orgUrl.trim())) {
        newErrors.orgUrl = 'Please enter a valid URL';
      }
    }

    if (!address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!companySize) {
      newErrors.companySize = 'Company size is required';
    }

    if (!industry) {
      newErrors.industry = 'Industry is required';
    }

    if (!timeZone) {
      newErrors.timeZone = 'Time zone is required';
    }

    if (!country) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    // Clear previous errors
    setErrors({});

    // Validate form
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    // Check if user is logged in
    if (!user?.id) {
      toast.error('You must be logged in to create an organization');
      return;
    }

    setLoading(true);

    let u;
    try {
      {
        const { message, error, url } = await uploadLogo(file as File);
        u = url;
      }

      const { message, error } = await createOrg({
        owner_id: user.id,
        organizationName: organizationName.trim(),
        orgDescription: orgDescription.trim(),
        industry: industry,
        timeZone: timeZone,
        orgUrl: orgUrl.trim(),
        country: country,
        address: address.trim(),
        companySize: companySize as 'SMALL' | 'MEDIUM' | 'LARGE' | 'ENTRPRISE',
        logo: u,
      });

      if (error) {
        toast.error(error);
      } else if (message) {
        toast.success(message);
      }
    } catch (err) {
      toast.error('An unexpected error occurred');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto p-4 gap-2">
      <Card className="w-full">
        <CardContent className="flex flex-col gap-4 pt-6">
          <h1 className="text-2xl font-bold">Create Organization</h1>

          <div className="space-y-2">
            <Label htmlFor="name">
              Organization Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="Acme Inc."
              onChange={(e) => setOrganizationName(e.target.value)}
              value={organizationName}
              className={errors.organizationName ? 'border-red-500' : ''}
            />
            {errors.organizationName && (
              <p className="text-sm text-red-500">{errors.organizationName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Tell us about your organization..."
              onChange={(e) => setOrgDescription(e.target.value)}
              value={orgDescription}
              className={errors.orgDescription ? 'border-red-500' : ''}
            />
            {errors.orgDescription && (
              <p className="text-sm text-red-500">{errors.orgDescription}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo</Label>
            <Input
              type="file"
              id="logo"
              name="logo"
              accept="image/*"
              onChange={(e) => handleFileChange(e)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">
              Organization URL <span className="text-red-500">*</span>
            </Label>
            <Input
              id="url"
              placeholder="https://example.com"
              name="url"
              onChange={(e) => setOrgUrl(e.target.value)}
              value={orgUrl}
              className={errors.orgUrl ? 'border-red-500' : ''}
            />
            {errors.orgUrl && (
              <p className="text-sm text-red-500">{errors.orgUrl}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>
              Industry <span className="text-red-500">*</span>
            </Label>
            <SelectIndustruy value={industry} setValue={setIndustry} />
            {errors.industry && (
              <p className="text-sm text-red-500">{errors.industry}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>
              Company Size <span className="text-red-500">*</span>
            </Label>
            <SelectCompanySize value={companySize} setValue={setCompanySize} />
            {errors.companySize && (
              <p className="text-sm text-red-500">{errors.companySize}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">
              Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="address"
              name="address"
              placeholder="123 Main Street"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              className={errors.address ? 'border-red-500' : ''}
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>
              Country <span className="text-red-500">*</span>
            </Label>
            <SelectCountry value={country} setValue={setCountry} />
            {errors.country && (
              <p className="text-sm text-red-500">{errors.country}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>
              Time Zone <span className="text-red-500">*</span>
            </Label>
            <SelectTimezone value={timeZone} setValue={setTimeZone} />
            {errors.timeZone && (
              <p className="text-sm text-red-500">{errors.timeZone}</p>
            )}
          </div>

          <Button
            type="button"
            onClick={handleCreate}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Spinner className="mr-2" /> Creating...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Create Organization
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
