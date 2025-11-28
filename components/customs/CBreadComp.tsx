'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathSegments } from '@/hooks/usepathSegments';

import { SlashIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

type T_Props = {
  steps?: string[];
};

const CBreadComp = ({ steps }: T_Props) => {
  const paths = usePathSegments();

  function createPath(stp: string[], index: number): string {
    let path = '';
    for (let i = 0; i <= index; i++) {
      path += `/${paths[i]}`;
    }
    console.log(`${path}`);
    return `${path}`;
  }

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          {paths.length > 0 &&
            paths.map((step, index) => {
              return (
                <React.Fragment key={index}>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href={createPath(steps as string[], index)}>
                        {step}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < paths.length - 1 && (
                    <BreadcrumbSeparator>
                      <SlashIcon />
                    </BreadcrumbSeparator>
                  )}
                </React.Fragment>
              );
            })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default CBreadComp;
