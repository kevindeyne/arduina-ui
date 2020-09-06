export class StatusChangeModel {
    id: number;
    statusClass: string;
    statusPrettyPrint: string;
R
    copyTo(e: string): StatusChangeModel {
        const json = JSON.parse(e);
        this.id = json.id;
        this.statusClass = json.statusClass;
        this.statusPrettyPrint = json.statusPrettyPrint;
        return this;
    }
}