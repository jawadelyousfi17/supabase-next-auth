import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const TIMEZONES = [
  {
    value: 'Pacific/Midway',
    label: '(UTC-11:00) Midway Island, Samoa',
    offset: 'UTC-11:00',
  },
  {
    value: 'Pacific/Honolulu',
    label: '(UTC-10:00) Hawaii',
    offset: 'UTC-10:00',
  },
  {
    value: 'America/Anchorage',
    label: '(UTC-09:00) Alaska',
    offset: 'UTC-09:00',
  },
  {
    value: 'America/Los_Angeles',
    label: '(UTC-08:00) Pacific Time (US & Canada)',
    offset: 'UTC-08:00',
  },
  {
    value: 'America/Tijuana',
    label: '(UTC-08:00) Tijuana, Baja California',
    offset: 'UTC-08:00',
  },
  {
    value: 'America/Denver',
    label: '(UTC-07:00) Mountain Time (US & Canada)',
    offset: 'UTC-07:00',
  },
  {
    value: 'America/Phoenix',
    label: '(UTC-07:00) Arizona',
    offset: 'UTC-07:00',
  },
  {
    value: 'America/Chihuahua',
    label: '(UTC-07:00) Chihuahua, La Paz, Mazatlan',
    offset: 'UTC-07:00',
  },
  {
    value: 'America/Chicago',
    label: '(UTC-06:00) Central Time (US & Canada)',
    offset: 'UTC-06:00',
  },
  {
    value: 'America/Mexico_City',
    label: '(UTC-06:00) Guadalajara, Mexico City, Monterrey',
    offset: 'UTC-06:00',
  },
  {
    value: 'America/Guatemala',
    label: '(UTC-06:00) Central America',
    offset: 'UTC-06:00',
  },
  {
    value: 'America/New_York',
    label: '(UTC-05:00) Eastern Time (US & Canada)',
    offset: 'UTC-05:00',
  },
  {
    value: 'America/Bogota',
    label: '(UTC-05:00) Bogota, Lima, Quito',
    offset: 'UTC-05:00',
  },
  {
    value: 'America/Indiana/Indianapolis',
    label: '(UTC-05:00) Indiana (East)',
    offset: 'UTC-05:00',
  },
  {
    value: 'America/Caracas',
    label: '(UTC-04:00) Caracas',
    offset: 'UTC-04:00',
  },
  {
    value: 'America/Halifax',
    label: '(UTC-04:00) Atlantic Time (Canada)',
    offset: 'UTC-04:00',
  },
  { value: 'America/La_Paz', label: '(UTC-04:00) La Paz', offset: 'UTC-04:00' },
  {
    value: 'America/Santiago',
    label: '(UTC-04:00) Santiago',
    offset: 'UTC-04:00',
  },
  {
    value: 'America/St_Johns',
    label: '(UTC-03:30) Newfoundland',
    offset: 'UTC-03:30',
  },
  {
    value: 'America/Sao_Paulo',
    label: '(UTC-03:00) Brasilia',
    offset: 'UTC-03:00',
  },
  {
    value: 'America/Argentina/Buenos_Aires',
    label: '(UTC-03:00) Buenos Aires, Georgetown',
    offset: 'UTC-03:00',
  },
  {
    value: 'America/Godthab',
    label: '(UTC-03:00) Greenland',
    offset: 'UTC-03:00',
  },
  {
    value: 'America/Montevideo',
    label: '(UTC-03:00) Montevideo',
    offset: 'UTC-03:00',
  },
  {
    value: 'Atlantic/South_Georgia',
    label: '(UTC-02:00) Mid-Atlantic',
    offset: 'UTC-02:00',
  },
  {
    value: 'Atlantic/Azores',
    label: '(UTC-01:00) Azores',
    offset: 'UTC-01:00',
  },
  {
    value: 'Atlantic/Cape_Verde',
    label: '(UTC-01:00) Cape Verde Is.',
    offset: 'UTC-01:00',
  },
  {
    value: 'Europe/London',
    label: '(UTC+00:00) London, Edinburgh, Dublin, Lisbon',
    offset: 'UTC+00:00',
  },
  {
    value: 'Africa/Casablanca',
    label: '(UTC+00:00) Casablanca, Monrovia',
    offset: 'UTC+00:00',
  },
  { value: 'UTC', label: '(UTC+00:00) UTC', offset: 'UTC+00:00' },
  {
    value: 'Europe/Paris',
    label: '(UTC+01:00) Paris, Brussels, Copenhagen, Madrid',
    offset: 'UTC+01:00',
  },
  {
    value: 'Europe/Berlin',
    label: '(UTC+01:00) Amsterdam, Berlin, Rome, Vienna',
    offset: 'UTC+01:00',
  },
  {
    value: 'Africa/Lagos',
    label: '(UTC+01:00) West Central Africa',
    offset: 'UTC+01:00',
  },
  {
    value: 'Europe/Athens',
    label: '(UTC+02:00) Athens, Bucharest, Istanbul',
    offset: 'UTC+02:00',
  },
  { value: 'Africa/Cairo', label: '(UTC+02:00) Cairo', offset: 'UTC+02:00' },
  {
    value: 'Africa/Johannesburg',
    label: '(UTC+02:00) Harare, Pretoria',
    offset: 'UTC+02:00',
  },
  {
    value: 'Europe/Helsinki',
    label: '(UTC+02:00) Helsinki, Kyiv, Riga, Sofia',
    offset: 'UTC+02:00',
  },
  {
    value: 'Asia/Jerusalem',
    label: '(UTC+02:00) Jerusalem',
    offset: 'UTC+02:00',
  },
  {
    value: 'Europe/Moscow',
    label: '(UTC+03:00) Moscow, St. Petersburg, Volgograd',
    offset: 'UTC+03:00',
  },
  {
    value: 'Asia/Kuwait',
    label: '(UTC+03:00) Kuwait, Riyadh',
    offset: 'UTC+03:00',
  },
  {
    value: 'Africa/Nairobi',
    label: '(UTC+03:00) Nairobi',
    offset: 'UTC+03:00',
  },
  { value: 'Asia/Baghdad', label: '(UTC+03:00) Baghdad', offset: 'UTC+03:00' },
  { value: 'Asia/Tehran', label: '(UTC+03:30) Tehran', offset: 'UTC+03:30' },
  {
    value: 'Asia/Dubai',
    label: '(UTC+04:00) Abu Dhabi, Muscat',
    offset: 'UTC+04:00',
  },
  {
    value: 'Asia/Baku',
    label: '(UTC+04:00) Baku, Tbilisi, Yerevan',
    offset: 'UTC+04:00',
  },
  { value: 'Asia/Kabul', label: '(UTC+04:30) Kabul', offset: 'UTC+04:30' },
  {
    value: 'Asia/Karachi',
    label: '(UTC+05:00) Islamabad, Karachi, Tashkent',
    offset: 'UTC+05:00',
  },
  {
    value: 'Asia/Kolkata',
    label: '(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi',
    offset: 'UTC+05:30',
  },
  {
    value: 'Asia/Colombo',
    label: '(UTC+05:30) Sri Jayawardenepura',
    offset: 'UTC+05:30',
  },
  {
    value: 'Asia/Kathmandu',
    label: '(UTC+05:45) Kathmandu',
    offset: 'UTC+05:45',
  },
  {
    value: 'Asia/Dhaka',
    label: '(UTC+06:00) Astana, Dhaka',
    offset: 'UTC+06:00',
  },
  {
    value: 'Asia/Yekaterinburg',
    label: '(UTC+06:00) Ekaterinburg',
    offset: 'UTC+06:00',
  },
  {
    value: 'Asia/Yangon',
    label: '(UTC+06:30) Yangon (Rangoon)',
    offset: 'UTC+06:30',
  },
  {
    value: 'Asia/Bangkok',
    label: '(UTC+07:00) Bangkok, Hanoi, Jakarta',
    offset: 'UTC+07:00',
  },
  {
    value: 'Asia/Novosibirsk',
    label: '(UTC+07:00) Novosibirsk',
    offset: 'UTC+07:00',
  },
  {
    value: 'Asia/Shanghai',
    label: '(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi',
    offset: 'UTC+08:00',
  },
  {
    value: 'Asia/Singapore',
    label: '(UTC+08:00) Kuala Lumpur, Singapore',
    offset: 'UTC+08:00',
  },
  { value: 'Asia/Taipei', label: '(UTC+08:00) Taipei', offset: 'UTC+08:00' },
  { value: 'Australia/Perth', label: '(UTC+08:00) Perth', offset: 'UTC+08:00' },
  { value: 'Asia/Seoul', label: '(UTC+09:00) Seoul', offset: 'UTC+09:00' },
  {
    value: 'Asia/Tokyo',
    label: '(UTC+09:00) Osaka, Sapporo, Tokyo',
    offset: 'UTC+09:00',
  },
  { value: 'Asia/Yakutsk', label: '(UTC+09:00) Yakutsk', offset: 'UTC+09:00' },
  {
    value: 'Australia/Adelaide',
    label: '(UTC+09:30) Adelaide',
    offset: 'UTC+09:30',
  },
  {
    value: 'Australia/Darwin',
    label: '(UTC+09:30) Darwin',
    offset: 'UTC+09:30',
  },
  {
    value: 'Australia/Brisbane',
    label: '(UTC+10:00) Brisbane',
    offset: 'UTC+10:00',
  },
  {
    value: 'Australia/Sydney',
    label: '(UTC+10:00) Canberra, Melbourne, Sydney',
    offset: 'UTC+10:00',
  },
  {
    value: 'Australia/Hobart',
    label: '(UTC+10:00) Hobart',
    offset: 'UTC+10:00',
  },
  {
    value: 'Pacific/Guam',
    label: '(UTC+10:00) Guam, Port Moresby',
    offset: 'UTC+10:00',
  },
  {
    value: 'Asia/Vladivostok',
    label: '(UTC+10:00) Vladivostok',
    offset: 'UTC+10:00',
  },
  {
    value: 'Pacific/Noumea',
    label: '(UTC+11:00) Solomon Is., New Caledonia',
    offset: 'UTC+11:00',
  },
  {
    value: 'Pacific/Auckland',
    label: '(UTC+12:00) Auckland, Wellington',
    offset: 'UTC+12:00',
  },
  {
    value: 'Pacific/Fiji',
    label: '(UTC+12:00) Fiji, Kamchatka, Marshall Is.',
    offset: 'UTC+12:00',
  },
  {
    value: 'Pacific/Tongatapu',
    label: "(UTC+13:00) Nuku'alofa",
    offset: 'UTC+13:00',
  },
  { value: 'Pacific/Apia', label: '(UTC+13:00) Samoa', offset: 'UTC+13:00' },
];
type T_Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const SelectTimezone = ({ value, setValue }: T_Props) => {
  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        <SelectGroup>
          <SelectLabel>Timezones</SelectLabel>
          {TIMEZONES.map((timezone) => (
            <SelectItem key={timezone.value} value={timezone.value}>
              {timezone.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectTimezone;
