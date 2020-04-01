/* eslint-env jest */
import { shallowMount } from "@vue/test-utils";
import ImagePage from "./ImagePage";

describe("image page", () => {
    it("renders correctly", () => {
        const wrapper = shallowMount(ImagePage);
        expect(wrapper).toBeTruthy();
    });

});
