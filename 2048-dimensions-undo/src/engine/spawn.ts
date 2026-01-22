//src/engine/spawn.ts

//responsible for spawning a new block each time a move is successful
/*
my key here was making sure this is non deterministic, when an undo occurs
I should be able to make the same move again and have the random tile possibly spawn
elsewhere.
*/
