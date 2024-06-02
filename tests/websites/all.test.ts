import { mergeWebsiteDict, unionWebsiteDict } from "../../src/websites/all";

describe('unionWebsiteDict', () => {
    it("Union should leave only true on true + false collision", () => {
        const dict1 = { "here": false }
        const dict2 = { "here": true }
        const result = unionWebsiteDict(dict1, dict2)
        const resultReversed = unionWebsiteDict(dict2, dict1)
        expect(result).toEqual( { "here": true })
        expect(resultReversed).toEqual( { "here": true })
    })
    it("Union should leave only false on false + false collision", () => {
        const dict1 = { "here": false }
        const dict2 = { "here": false }
        const result = unionWebsiteDict(dict1, dict2)
        const resultReversed = unionWebsiteDict(dict2, dict1)
        expect(result).toEqual( { "here": false })
        expect(resultReversed).toEqual( { "here": false })
    })
    it("Union should leave only true on true + true collision", () => {
        const dict1 = { "here": true }
        const dict2 = { "here": true }
        const result = unionWebsiteDict(dict1, dict2)
        const resultReversed = unionWebsiteDict(dict2, dict1)
        expect(result).toEqual( { "here": true })
        expect(resultReversed).toEqual( { "here": true })
    })
    it("Union should merge dicts with no collisions", () => {
        const dict1 = { "here": false }
        const dict2 = { "there": true }
        const result = unionWebsiteDict(dict1, dict2)
        const resultReversed = unionWebsiteDict(dict2, dict1)
        expect(result).toEqual( { "here": false, "there": true })
        expect(resultReversed).toEqual( { "here": false, "there": true })
    })
})

describe('mergeWebsiteDict', () => {
    it("On field collision, merge should prioritize first dict", () => {
        const dict1 = { "here": false }
        const dict2 = { "here": true }
        const result = mergeWebsiteDict(dict1, dict2)
        expect(result).toEqual( { "here": false })
        const resultReversed = mergeWebsiteDict(dict2, dict1)
        expect(resultReversed).toEqual( { "here": true })
    })
    it("Without field collision, merge should combine two dicts", () => {
        const dict1 = { "here": false }
        const dict2 = { "there": true }
        const result = mergeWebsiteDict(dict1, dict2)
        const resultReversed = mergeWebsiteDict(dict2, dict1)
        expect(result).toEqual( { "here": false, "there": true })
        expect(resultReversed).toEqual( { "here": false, "there": true })
    })
})