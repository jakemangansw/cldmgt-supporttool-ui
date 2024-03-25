export interface SupportUser {
    id: string,
    email: string;
    firstName: string;
    lastName: string;
    subjectId: string;
    authorisationRole: number;
    isApproved: boolean;
}