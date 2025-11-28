import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const INDUSTRIES = [
  { value: 'technology', label: 'Technology' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance & Banking' },
  { value: 'education', label: 'Education' },
  { value: 'retail', label: 'Retail & E-commerce' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'construction', label: 'Construction' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'hospitality', label: 'Hospitality & Tourism' },
  { value: 'transportation', label: 'Transportation & Logistics' },
  { value: 'media', label: 'Media & Entertainment' },
  { value: 'telecommunications', label: 'Telecommunications' },
  { value: 'energy', label: 'Energy & Utilities' },
  { value: 'agriculture', label: 'Agriculture' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'legal', label: 'Legal Services' },
  { value: 'marketing', label: 'Marketing & Advertising' },
  { value: 'nonprofit', label: 'Non-Profit' },
  { value: 'government', label: 'Government' },
  { value: 'other', label: 'Other' },
];

type T_Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const SelectIndustruy = ({value, setValue} : T_Props) => {
  return (
    <Select value={value} onValueChange={setValue} >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select an industry" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Industries</SelectLabel>
          {INDUSTRIES.map((item, index) => {
            return (
              <SelectItem key={index} value={item.value}>
                {item.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectIndustruy;
