/* eslint-env jest */
import { shallowMount } from "@vue/test-utils";
import FullscreenImage from "./FullscreenImage";

describe("slider", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(FullscreenImage, {
      propsData: { img: "blah" }
    });
    expect(wrapper).toBeTruthy();
  });

  it("should emit close-fullscreen event", () => {
    const wrapper = shallowMount(FullscreenImage, {
      propsData: {img: "blah"}
    });

    wrapper.find("div.full").trigger("click");

    expect(wrapper.emitted()["close-fullscreen"][0]).toBeTruthy();
  });
});
