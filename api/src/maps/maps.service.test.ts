import * as maps_service from "./maps.service"
// @ponicode
describe("generate", () => {
    let inst: any

    beforeEach(() => {
        inst = new maps_service.MapsService()
    })

    test("0", () => {
        let result: any = inst.generate()
        expect(result).toMatchSnapshot()
    })
})
