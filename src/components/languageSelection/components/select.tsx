import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type DifficultyOption = {
  value: string;
  label: string;
  description: string;
};

type SelectionProps = {
  value: string;
  onValueChange: (e: string) => void;
  selectValue: string;
  data: DifficultyOption[];
};

export function Selection({
  value,
  onValueChange,
  selectValue,
  data,
}: SelectionProps) {
  return (
    <Select onValueChange={onValueChange} value={value}>
      <SelectTrigger>
        <SelectValue placeholder={selectValue} />
      </SelectTrigger>
      <SelectContent>
        {data.map(({ value, label, description }) => (
          <TooltipProvider key={value}>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <SelectItem value={value}>{label}</SelectItem>
              </TooltipTrigger>
              <TooltipContent>
                <p>{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </SelectContent>
    </Select>
  );
}
