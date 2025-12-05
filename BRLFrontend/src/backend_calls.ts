import { Resource, Comment, Flag } from "./types";
export function retrieveResource(id: number): Resource | undefined {
    if (Number.isFinite(id)) {

        return new Resource(
            17,
            "Timothee",
            "Greswell",
            31,
            new Date(1764885210440),
            false,
            false,
            "YET ANOTHER RESOURCE",
            "Wow, yet another description. Isn't that lovely?",
            "https://runningoutofcoolideasatthispoint.com",
            [
                new Comment(
                    0,
                    "Margit",
                    "Filipczynski",
                    19,
                    new Date(1764885417291),
                    false,
                    false,
                    "Beautiful. Brought a tear to my eye.",
                ),
                new Comment(
                    1,
                    "Margit",
                    "Filipczynski",
                    19,
                    new Date(1764885428055),
                    false,
                    false,
                    "Beautiful. Brought a second tear to my eye."
                )
            ],
            [
                new Flag(
                    0,
                    "Margit",
                    "Filipczynski",
                    19,
                    new Date(1764885462868),
                    false,
                    false,
                    "This is a flag for manager review."
                ),
                new Flag(
                    1,
                    "Margit",
                    "Filipczynski",
                    19,
                    new Date(1764885495432),
                    false,
                    false,
                    "Whoops! I didn't mean to add that one."
                ),
                new Flag(
                    2,
                    "Renee",
                    "Zecchii",
                    22,
                    new Date(1764885796465),
                    true,
                    false,
                    "Another one? Absolutely not. Manager!!!!!!! [Oh cool, you can edit these...] -&gt; Multiple times even"
                )
            ],
            0,
            false,
            0
        )
    } else {
        return undefined;
    }
} 