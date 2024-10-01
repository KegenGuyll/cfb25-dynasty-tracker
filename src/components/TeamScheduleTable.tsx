import React from "react";
import {  
  Table,  
  TableHeader,  
  TableBody,  
  TableColumn,  
  TableRow,  
  TableCell
} from "@nextui-org/table";
import TeamSelect from "./TeamSelect";
import { Select, SelectItem } from "@nextui-org/select";
import { Input } from "@nextui-org/input";
import { Control, Controller } from "react-hook-form";
import { CreateTeamScheduleForm } from "@/app/team-schedule/create/page";

type TeamScheduleTableProps = {
  numberOfWeeks: number
  teamOptions: { value: string, label: string }[]
  control: Control<CreateTeamScheduleForm, any>
}

const TeamScheduleTable: React.FC<TeamScheduleTableProps> = (
  {
    teamOptions,
    numberOfWeeks,
    control
  }: TeamScheduleTableProps) => {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>WEEK</TableColumn>
        <TableColumn>LOCATION</TableColumn>
        <TableColumn>OPPONENT</TableColumn>
        <TableColumn>STADIUM</TableColumn>
      </TableHeader>
      <TableBody>
        {Array.from({ length: numberOfWeeks }, (_, i) => i).map((week, i) => (
          <TableRow key={week.toString()}>
            <TableCell className="w-[45px]" >
              <span className="w-full text-center" >{week}</span>
            </TableCell>   
            <TableCell tabIndex={week}>
              <Controller
                control={control}
                name={`games.${i}.location`}
                render={({ field }) => (
                  <Select
                    className="max-w-[80px]"
                    fullWidth
                    size="lg"
                    {...field}
                  >
                    {['VS', 'AT', 'BYE'].map((location) => (
                      <SelectItem 
                        key={location} 
                        value={location}
                      >
                          {location}
                      </SelectItem>
                    ))}
                  </Select>
                )}
              />
            </TableCell>
            <TableCell className="max-w-[300px]">
              <Controller
                control={control}
                name={`games.${i}.opponent`}
                render={({ field: {value, onChange} }) => (
                  <TeamSelect 
                    label="Opponent"
                    value={teamOptions?.find((option) => option.value === value)}
                    onChange={onChange}
                    placeholder="Select Opponent" 
                    options={teamOptions} 
                  />
                )}
              />
            </TableCell>
            <TableCell className="max-w-[200px]">
              <Controller
                control={control}
                name={`games.${i}.stadium`}
                render={({ field: { onChange, value} }) => (
                  <Input 
                    label="Stadium name"
                    fullWidth
                    size='lg' 
                    value={value || ''}
                    onChange={onChange}
                  />
                )}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TeamScheduleTable;