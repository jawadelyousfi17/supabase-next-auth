import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React from 'react';

type T_Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<any>>;
};

const SelectCompanySize = ({ value, setValue }: T_Props) => {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select company size" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>comapny size</SelectLabel>
          <SelectItem value="SMALL">small</SelectItem>
          <SelectItem value="MEDIUM">medium</SelectItem>
          <SelectItem value="LARGE">large</SelectItem>
          <SelectItem value="ENTREPRISE">entreprise</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectCompanySize;
