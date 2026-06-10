export declare class CreateCategoryDto {
    userId: string;
    name: string;
    domain: string;
    isEssential?: boolean;
    constructor(userId: string, name: string, domain: string, isEssential?: boolean);
}
