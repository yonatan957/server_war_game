import missles from '../Data/missiles.json'
import Missle from '../models/Missle';
import organizations from "../Data/organizations.json";
import organization from '../models/organization';

export const sidService = async () => {
    missles.forEach(async(missile) => {
        await Missle.create(missile);
    })
    organizations.forEach(async (org) => {
        await organization.create(org);
    })
    return true
}; 