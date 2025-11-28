'use client';

import { Card, CardContent } from './ui/card';
import { Building2, Users, MapPin, ArrowRight } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface OrganizationCardProps {
  id: string;
  name: string;
  size: number;
  status: boolean;
  logo: string;
  industry?: string;
  country?: string;
}

export function OrganizationCard({
  id,
  name,
  size,
  status,
  logo,
  industry,
  country,
}: OrganizationCardProps) {
  const pathname = usePathname();
  const newPath = `${pathname}/manage/${id}`;

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  return (
    <Link href={newPath}>
      <Card className="hover:shadow-md transition-all duration-200 cursor-pointer group p-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <Avatar className="h-12 w-12">
                <AvatarImage src={logo} alt={name} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  <Building2 className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold truncate">{name}</h3>
                  <Badge
                    variant={status ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {status ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    <span>{size} members</span>
                  </div>
                  {country && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{country}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
