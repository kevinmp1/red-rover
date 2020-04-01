/* eslint-env jest */
import { shallowMount } from "@vue/test-utils";
import Slider from "./Slider";

describe("slider", () => {
  it("renders correctly", () => {
    const wrapper = shallowMount(Slider, {
      propsData: { start: new Date(), end: new Date() }
    });
    expect(wrapper).toBeTruthy();
  });

  it("should format the date as expected", () => {
    const date = new Date(2020, 2, 31);
    const wrapper = shallowMount(Slider, {
      propsData: { start: new Date(), end: new Date() }
    });

    expect(wrapper.vm.formatDate(date)).toEqual("March 31, 2020");
  });

  it("should compute all dates between start and end date (start, end]", () => {
    const startDate = new Date(2020, 2, 31);
    const endDate = new Date(2020, 3, 5);
    const wrapper = shallowMount(Slider, {
      propsData: { start: startDate, end: endDate }
    });

    expect(wrapper.vm.dates).toContainEqual(endDate);
    expect(wrapper.vm.dates).toContainEqual(new Date(2020, 3, 4));
    expect(wrapper.vm.dates).toContainEqual(new Date(2020, 3, 3));
    expect(wrapper.vm.dates).toContainEqual(new Date(2020, 3, 2));
    expect(wrapper.vm.dates).toContainEqual(new Date(2020, 3, 1));
  });

  it("should compute date picked", async () => {
    const startDate = new Date(2020, 2, 31);
    const endDate = new Date(2020, 3, 5);
    const wrapper = shallowMount(Slider, {
      propsData: { start: startDate, end: endDate }
    });

    const input = wrapper.find("input.slideyboi");
    input.element.value = 2;
    input.trigger("input");
    await wrapper.vm.$nextTick();

    expect(wrapper.find("span.slide-label").text()).toEqual("April 2, 2020");
  });

  it("should emit date-change event", () => {
    const startDate = new Date(2020, 2, 31);
    const endDate = new Date(2020, 3, 5);
    const wrapper = shallowMount(Slider, {
      propsData: {
        start: startDate,
        end: endDate
      }
    });

    const input = wrapper.find("input.slideyboi");
    input.element.value = 2;
    input.trigger("input");

    // wrapper.emitted() === {'date-change': [[2020-04-02T05:00:00.000Z]]}
    // could be expressed as wrapper.emitted().datechange[0] if not for the dash
    expect(wrapper.emitted()["date-change"][0]).toEqual([new Date(2020, 3, 2)]);
  });
});
