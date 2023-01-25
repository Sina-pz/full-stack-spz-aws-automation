export interface Listing {
    id: string,
    name: string,
    description: string,
    price: number,
    views: number,
};

export interface Course {
    id: number,
    description: string,
    longDescription: string,
    iconUrl: string,
    courseListIcon: string,
    category: string,
    lessonsCount: string,
    seqNo: number,
    url: string,
    price: number,
    promo: boolean
}

export interface Lesson {
    id: number,
    description: string,
    duration: string,
    seqNo: number,
    courseId: number,
    videoId: number
}

export type Category = 'BEGINNER' | 'ADVANCED';

export interface User {
    id: number,
    email: string,
    password: string,
    pictureUrl: string,
}

type LogIconType = 'Login' | 'Logout' | 'Signup';

export interface IModalConfig {
    title: string;
    toOpen: boolean;
}