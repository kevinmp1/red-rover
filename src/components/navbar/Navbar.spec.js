/* eslint-env jest */
import { shallowMount } from "@vue/test-utils";
import Navbar from "./Navbar";

describe("navbar", () => {
    it("renders correctly", () => {
        const wrapper = shallowMount(Navbar, {stubs: ['router-link']});
        expect(wrapper).toBeTruthy();
    });

    it("should route to '/' on click", () => {
        const mockPush = jest.fn();
        const $router = {
            push: mockPush
        };
        const wrapper = shallowMount(Navbar, { stubs: ["router-link"], mocks: { $router } });
      
        wrapper.find('img.nav-logo').trigger('click');

        expect(mockPush).toHaveBeenCalledWith('/');
    });
});