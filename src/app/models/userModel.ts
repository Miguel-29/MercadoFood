export interface userModel {
    user: string,
    password: string,
    admin: boolean
}

export interface userInfoModel {
    cell?: string;
    dob?: object;
    email?: string;
    gender?: string,
    id?: object,
    location?: object,
    login?: object,
    name?: nameUserModel,
    nat?: string,
    phone?: string,
    picture?: object,
    registered?: object
}

export interface nameUserModel {
    first?: string,
    last?: string,
    title?: boolean
}

export class orderClass implements userInfoModel {
    cell?: string;
    dob?: object;
    email?: string;
    gender?: string;
    id?: object;
    location?: object;
    login?: object;
    name?: nameUserModel;
    nat?: string;
    phone?: string;
    picture?: object;
    registered?: object;

    constructor(cell?: string, dob?: object, email?: string, gender?: string, id?: object, location?: object, login?: object, first?: string, last?: string, nat?: string, phone?: string, picture?: object, registered?: object) {
        this.cell = cell;
        this.dob = dob;
        this.email = email;
        this.gender = gender;
        this.id = id;
        this.location = location;
        this.login = login;
        this.name = {
            first: first,
            last: last
        };
        this.nat = nat;
        this.phone = phone;
        this.picture = picture;
        this.registered = registered;
    }
}
