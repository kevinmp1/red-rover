/* eslint-env jest */
import { shallowMount } from "@vue/test-utils";
import App from "./App";

describe("image page", () => {
    it("renders correctly", () => {
        const $route = {
            path: "mock"
        };
        const wrapper = shallowMount(App, { stubs: ["router-view"], mocks: { $route } });
        
        expect(wrapper).toBeTruthy();
    });

    /*
    * Personally, I don't think this is a worthwhile test. But heres to show it can be done quite easily.
    */
    it("renders navbar", () => {
        const $route = {
            path: "mock"
        };

        const wrapper = shallowMount(App, { stubs: ["router-view"], mocks: { $route } });

        expect(wrapper.find('Navbar')).toBeTruthy();
    });
});
