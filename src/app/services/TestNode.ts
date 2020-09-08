export class TestNode {
    id = 0;
    sequence = 0;
    command: string;
    lastRun = 0;
    lastState: string;
    lastStatePretty: string;
    stateClass: string;
    error: string;
    warning: string;
    testcaseId = 0;
}