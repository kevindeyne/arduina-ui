export class StatusChangeModel {
    id: number;
    statusClass: string;
    statusPrettyPrint: string;
    error: string;
    warning: string;

    copyTo(e: string): StatusChangeModel {
        const json = JSON.parse(e);
        this.id = json.id;
        this.statusClass = json.statusClass;
        this.statusPrettyPrint = json.statusPrettyPrint;
        this.error = json.error;
        this.warning = json.warning;
        return this;
    }
}