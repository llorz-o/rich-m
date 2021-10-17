const string = require("./string")
// @ponicode
describe("string.toPascalCase", () => {
    test("0", () => {
        let callFunction = () => {
            string.toPascalCase("<?xml version=\"1.0\" ?>\n<a b=\"c\"/>\n")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            string.toPascalCase("<?xml version=\"1.0\" ?><a b=\"c\"/>")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            string.toPascalCase(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("string.toKebabCase", () => {
    test("0", () => {
        let callFunction = () => {
            string.toKebabCase("<?xml version=\"1.0\" ?><a b=\"c\"/>")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            string.toKebabCase("<?xml version=\"1.0\" ?>\n<a b=\"c\"/>\n")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            string.toKebabCase(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
