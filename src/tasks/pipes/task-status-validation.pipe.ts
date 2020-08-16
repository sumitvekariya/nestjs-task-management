import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../taskstatus.enum";

export class TaskStatusValidation implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN
    ];

    transform(value: string): string {
        value = value.toUpperCase();
        if (this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is not a valid status`)
        }
        return value;
    }

    private isStatusValid(status) {
        const idx = this.allowedStatuses.indexOf(status);
        return idx !== -1;
    }
}