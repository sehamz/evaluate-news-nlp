import { TestScheduler } from "jest"
import { checkURL } from "../src/client/js/URLChecker"

test("checkURL function test: ", () => {
    expect(checkURL).toBeDefined();
})