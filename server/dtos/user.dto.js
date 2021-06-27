export default class UserDto {
    email;
    name;
    id;
    isActivated;
    createdAt;

    constructor(model) {
        this.email = model.email;
        this.name = model.name;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.createdAt = model.createdAt;
    }
}