'use server';

import prisma from '@/lib/prisma';

export const updateName = async (id: string, newName: string) => {
    try {
        const user = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name: newName,
            },
        });
        return newName;
    } catch (error) {
        throw new Error("Can't update the name");
    }
};
