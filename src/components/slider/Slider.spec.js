/* eslint-env jest */
import { shallowMount } from '@vue/test-utils'
import Slider from './Slider'

describe('slider', () => {
    it('renders correctly', () => {
        const wrapper = shallowMount(Slider, { propsData: { start: new Date(), end: new Date() } });
        expect(wrapper).toBeTruthy();
    });
});