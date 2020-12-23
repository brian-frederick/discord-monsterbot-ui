// When we store moves in state, we store them by a key for quick access.
// Now that we allow dup move keys, our state key must be compounded with guild Id.
export const compoundKey = move => `${move.key.toLowerCase()}-${move.guildId}`;
