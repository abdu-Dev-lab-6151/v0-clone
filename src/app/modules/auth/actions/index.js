"use server";
import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

export const onBoardUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return {
        success: false,
        message: "Unathuorized user",
      };
    }
    const { id, firstName, lastName, imageUrl, emailAddresses } = user;

    const newUser = await db.user.upsert({
      where: { clerkId: id },
      update: {
        name:
          firstName && lastName
            ? `${firstName} ${lastName}`
            : firstName || lastName || null,
        image: imageUrl || null,
        email: emailAddresses[0]?.emailAddress || "",
      },
      create: {
        clerkId: id,
        name:
          firstName && lastName
            ? `${firstName} ${lastName}`
            : firstName || lastName || null,
        image: imageUrl || null,
        email: emailAddresses[0]?.emailAddress || "",
      },
    });
    return {
      success: true,
      user: newUser,
      message: "user onBoard Succesfully",
    };
  } catch (error) {
    console.error("❌ error onBoarding user", error);
    return { success: false, error: "failed to onBoard user" };
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return null;
    }

    const dbUser = await db.user.findUnique({
      where: {
        clerkId: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        clerkId: true,
      },
    });
    return dbUser;
  } catch (error) {
    console.error("❌ Error fetching current user", error);
    return null;
  }
};
