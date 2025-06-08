export abstract class Entity implements IEntity {
    public id: string;
    public createdAt: Date;
    public updatedAt: Date;

    constructor(data: IEntity){
        this.id = data.id;
        this.createdAt = data.createdAt ?? new Date(data.createdAt);
        this.updatedAt = data.updatedAt ?? new Date(data.updatedAt);
    }
}

export interface IEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}