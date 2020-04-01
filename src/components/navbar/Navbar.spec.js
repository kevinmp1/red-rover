/* eslint-env jest */
import { shallowMount } from "@vue/test-utils";
import Navbar from "./Navbar";

describe("navbar", () => {
    it("renders correctly", () => {
        const wrapper = shallowMount(Navbar, {stubs: ['router-link']});
        expect(wrapper).toBeTruthy();
    });
});