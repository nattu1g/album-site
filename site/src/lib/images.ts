import type { ImageMetadata } from 'astro';

export function getStudentImage(filename: string) {
    const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/students/*.{jpeg,jpg,png,gif}');
    const path = `/src/assets/images/students/${filename}`;
    return images[path] ? images[path]() : null;
}

export function getEventImage(filename: string) {
    const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/events/*.{jpeg,jpg,png,gif}');
    const path = `/src/assets/images/events/${filename}`;
    return images[path] ? images[path]() : null;
}

export function getClubImage(filename: string) {
    const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/clubs/*.{jpeg,jpg,png,gif}');
    const path = `/src/assets/images/clubs/${filename}`;
    return images[path] ? images[path]() : null;
}

export function getTeacherImage(filename: string) {
    const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/teachers/*.{jpeg,jpg,png,gif}');
    const path = `/src/assets/images/teachers/${filename}`;
    return images[path] ? images[path]() : null;
}
