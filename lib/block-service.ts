import getSelf from "./auth-service";
import { db } from "./db";

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      return false;
    }

    const excitingBlock = await db.block.findFirst({
      where: {
        blockerId: otherUser.id,
        blockedId: self.id,
      },
    });

    return !!excitingBlock;
  } catch {
    return false;
  }
};

export const hasBlockedUser = async (id: string) => {
  try {
    const self = await getSelf();

    const otherUser = await db.user.findUnique({
      where: {
        id,
      },
    });

    if (!otherUser) {
      throw new Error("User not found");
    }

    if (otherUser.id === self.id) {
      return false;
    }

    const excitingBlock = await db.block.findFirst({
      where: {
        blockerId: self.id,
        blockedId: otherUser.id,
      },
    });

    return !!excitingBlock;
  } catch {
    return false;
  }
};

export const blockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) {
    throw new Error("You cannot block yourself");
  }

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  const excitingBlock = await db.block.findFirst({
    where: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
  });

  if (excitingBlock) {
    throw new Error("You have already blocked this user");
  }

  const block = await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
    include: {
      blocked: true,
    },
  });

  return block;
};

export const unblockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) {
    throw new Error("You cannot unblock yourself");
  }

  const otherUser = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!otherUser) {
    throw new Error("User not found");
  }

  const excitingBlock = await db.block.findFirst({
    where: {
      blockerId: self.id,
      blockedId: otherUser.id,
    },
  });

  if (!excitingBlock) {
    throw new Error("You have not blocked this user");
  }

  const unblock = await db.block.delete({
    where: {
      id: excitingBlock.id,
    },
    include: {
      blocked: true,
    },
  });

  return unblock;
};

export const getBlockedUsers = async () => {
  const self = await getSelf();

  const blockUsers = await db.block.findMany({
    where: {
      blockerId: self.id,
    },
    include: {
      blocked: true,
    },
  });

  return blockUsers;
};
