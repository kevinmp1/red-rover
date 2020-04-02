/* eslint-env jest */
import { shallowMount } from "@vue/test-utils";
import ImagePage from "./ImagePage";
import axios from "axios";
import Slider from "../slider/Slider";
jest.mock("axios");

describe("image page", () => {

    beforeEach(() => {
        axios.mockReset();
    });

    it("renders correctly", () => {
        const wrapper = shallowMount(ImagePage);
        expect(wrapper).toBeTruthy();
    });

    describe("array shuffle", () => {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

        it("should keep array size the same", () => {
            const wrapper = shallowMount(ImagePage);
            expect(wrapper.vm.shuffle(array, 0).length).toEqual(array.length);
        });

        it("should change the array", () => {
            const wrapper = shallowMount(ImagePage);
            expect(wrapper.vm.shuffle(array, 0)).not.toEqual(array);
        });

        it("should keep the same values of the array", () => {
            const wrapper = shallowMount(ImagePage);
            const newArray = wrapper.vm.shuffle(array, 0);

            newArray.forEach(element => {
                expect(array).toContain(element);
            });
        });

        describe("part", () => {
            it("should keep array size the same", () => {
                const wrapper = shallowMount(ImagePage);
                expect(wrapper.vm.shuffle(array, 2).length).toEqual(array.length);
            });

            it("should change the array", () => {
                const wrapper = shallowMount(ImagePage);
                expect(wrapper.vm.shuffle(array, 2)).not.toEqual(array);
            });

            it("should change only part of the array", () => {
                const wrapper = shallowMount(ImagePage);
                const newArray = wrapper.vm.shuffle(array, 2);

                for (let i = 0; i < 2; i++) {
                    expect(newArray[i]).toEqual(array[i]);
                }
            });

            it("should keep the same values of the array", () => {
                const wrapper = shallowMount(ImagePage);
                const newArray = wrapper.vm.shuffle(array, 2);

                newArray.forEach(element => {
                    expect(array).toContain(element);
                });
            });
        });
    });

    describe("mounted", () => {
        it("should load start date as selectedDate", () => {
            const date = new Date();
            const wrapper = shallowMount(ImagePage, { propsData: { start: date } });
            expect(wrapper.vm.selectedDate).toEqual(date);
        });
    });

    describe("debounceEvent", () => {
        it("should call debounce", async () => {
            const mockFunc = jest.fn();
            const wrapper = shallowMount(ImagePage);
            wrapper.setData({ debounce: mockFunc });
            await wrapper.vm.$nextTick();

            wrapper.vm.debounceEvent({});
            expect(mockFunc).toHaveBeenCalledTimes(1);
        });
    });

    describe("loadPhotos", () => {
        it("should get images", async () => {
            axios.get.mockImplementation(() =>
              Promise.resolve({ data: { photos: [{ img_src: "blah" }] } })
            );
            const date = new Date();
            const wrapper = shallowMount(ImagePage, { propsData: {rover: "rover", token: "token"} });
            wrapper.setData({ selectedDate: date });
            await wrapper.vm.$nextTick();
            wrapper.vm.shuffle = jest.fn();
            wrapper.vm.processPhotos = jest.fn();

            wrapper.vm.loadPhotos({loaded: jest.fn()});

            expect(axios.get).toHaveBeenCalledTimes(1);
            expect(axios.get).toHaveBeenCalledWith(
                "https://api.nasa.gov/mars-photos/api/v1/rovers/rover/photos?earth_date=" +
                `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` +
                `&api_key=token&page=1`
            );
        });

        it("should increment page", async () => {
            axios.get.mockImplementation(() =>
              Promise.resolve({ data: { photos: [{ img_src: "blah" }] } })
            );
            const date = new Date();
            const wrapper = shallowMount(ImagePage, { propsData: {rover: "rover", token: "token"} });
            wrapper.setData({ selectedDate: date });
            await wrapper.vm.$nextTick();
            wrapper.vm.shuffle = jest.fn();
            wrapper.vm.processPhotos = jest.fn();

            wrapper.vm.loadPhotos({ loaded: jest.fn() });
            await wrapper.vm.$nextTick();
            
            expect(wrapper.vm.page).toEqual(2);
        });

        it("should call shuffle and then processImages", async () => {
            axios.get.mockImplementation(() =>
              Promise.resolve({ data: { photos: [{ img_src: "blah" }] } })
            );
            const date = new Date();
            const wrapper = shallowMount(ImagePage, { propsData: {rover: "rover", token: "token"} });
            wrapper.setData({ selectedDate: date });
            await wrapper.vm.$nextTick();
            const mockShuffle = jest.fn();
            const mockProcess = jest.fn();
            wrapper.vm.shuffle = mockShuffle;
            wrapper.vm.processPhotos = mockProcess;

            wrapper.vm.loadPhotos({ loaded: jest.fn() });
            await wrapper.vm.$nextTick();
            
            expect(mockShuffle).toHaveBeenCalledTimes(1);
            expect(mockShuffle).toHaveBeenCalledWith(["blah"], 0);
            expect(mockProcess).toHaveBeenCalledTimes(1);
            expect(mockProcess).toHaveBeenCalledWith([{ img_src: "blah" }]);
        });

        it("should set state to loaded", async () => {
            axios.get.mockImplementation(() =>
              Promise.resolve({ data: { photos: [{ img_src: "blah" }] } })
            );
            const date = new Date();
            const wrapper = shallowMount(ImagePage, { propsData: {rover: "rover", token: "token"} });
            wrapper.setData({ selectedDate: date });
            await wrapper.vm.$nextTick();
            wrapper.vm.shuffle = jest.fn();
            wrapper.vm.processPhotos = jest.fn();
            const mockLoaded = jest.fn();

            wrapper.vm.loadPhotos({loaded: mockLoaded});
            await wrapper.vm.$nextTick();
            
            expect(mockLoaded).toHaveBeenCalledTimes(1);
        });

        it("should set state to complete", async () => {
            axios.get.mockImplementation(() =>
              Promise.resolve({ data: { photos: [] } }) //no photos returned
            );
            const date = new Date();
            const wrapper = shallowMount(ImagePage, { propsData: {rover: "rover", token: "token"} });
            wrapper.setData({ selectedDate: date });
            wrapper.setData({ images: ["blah"] }); //have some image "loaded"
            await wrapper.vm.$nextTick();
            wrapper.vm.shuffle = jest.fn();
            wrapper.vm.processPhotos = jest.fn();
            const mockComplete = jest.fn();

            wrapper.vm.loadPhotos({ complete: mockComplete });
            await wrapper.vm.$nextTick();
            
            expect(mockComplete).toHaveBeenCalledTimes(1);
        });

        it("should reset state then set to complete", async () => {
            axios.get.mockImplementation(() =>
              Promise.resolve({ data: { photos: [] } }) //no photos returned
            );
            const date = new Date();
            const wrapper = shallowMount(ImagePage, { propsData: {rover: "rover", token: "token"} });
            wrapper.setData({ selectedDate: date });
            await wrapper.vm.$nextTick();
            wrapper.vm.shuffle = jest.fn();
            wrapper.vm.processPhotos = jest.fn();
            const mockComplete = jest.fn();
            const mockReset = jest.fn();

            wrapper.vm.loadPhotos({complete: mockComplete, reset: mockReset});
            await wrapper.vm.$nextTick();
            
            expect(mockReset).toHaveBeenCalledTimes(1);
            expect(mockComplete).toHaveBeenCalledTimes(1);
        });
    });

    describe("low res photos", () => {
        it("should remove photos with width lower than 300", async () => {
            const photos = [{ img_src: "src/assets/rover-minier.png" }];
            const wrapper = shallowMount(ImagePage);
            wrapper.setData({ images: photos });
            await wrapper.vm.$nextTick();

            const img = wrapper.vm.removeLowResPhoto("src/assets/rover-minier.png");
            img.height = 300;
            img.width = 299;
            img.onload();
            expect(wrapper.vm.images).toEqual([]);
        });

        it("should remove photos with height lower than 300", async () => {
          const photos = [{ img_src: "src/assets/rover-minier.png" }];
          const wrapper = shallowMount(ImagePage);
          wrapper.setData({ images: photos });
          await wrapper.vm.$nextTick();

          const img = wrapper.vm.removeLowResPhoto("src/assets/rover-minier.png");
          img.height = 299;
          img.width = 300;
          img.onload(); //manually call onload since image never truly loads
          expect(wrapper.vm.images).toEqual([]);
        });

        it("should not remove photos with height and width higher than 300", async () => {
            const photos = [{ img_src: "src/assets/rover-minier.png" }];
            const wrapper = shallowMount(ImagePage);
            wrapper.setData({ images: photos });
            await wrapper.vm.$nextTick();

            const img = wrapper.vm.removeLowResPhoto("src/assets/rover-minier.png");
            img.height = 400;
            img.width = 400;
            img.onload(); //manually call onload since image never truly loads
            expect(wrapper.vm.images).toEqual(photos);
        });

         it("should call removeLowResPhoto on each photo", () => {
            const photos = [
                { img_src: "1" },
                { img_src: "2" },
                { img_src: "3" }
            ];
            const mockFunc = jest.fn();
            const wrapper = shallowMount(ImagePage);
            wrapper.vm.removeLowResPhoto = mockFunc;

            wrapper.vm.processPhotos(photos);
            expect(mockFunc).toHaveBeenCalledTimes(3);
         });
    });

    describe("debounce", () => {
        it("should reset component state", async () => {
            const mockReset = jest.fn();
            const infiniteStub = {
                render: () => { },
                data() {
                    return {
                        stateChanger: {
                            reset: mockReset
                        }
                    }
                }
            }
            const wrapper = shallowMount(ImagePage, {
                stubs: { "infinite-loading": infiniteStub}
            });
            wrapper.setData({ images: ["test", "test2"], page: 27 });
            await wrapper.vm.$nextTick();

            wrapper.vm.reset(new Date());

            expect(wrapper.vm.images).toEqual([]);
            expect(wrapper.vm.page).toEqual(1);
            expect(mockReset).toHaveBeenCalledTimes(1);
        });

        it("should set selectedDate", () => {
            const mockReset = jest.fn();
            const infiniteStub = {
                render: () => { },
                data() {
                    return {
                        stateChanger: {
                            reset: mockReset
                        }
                    }
                }
            }
            const wrapper = shallowMount(ImagePage, {
                stubs: { "infinite-loading": infiniteStub}
            });
            const date = new Date();

            wrapper.vm.reset(date);

            expect(wrapper.vm.selectedDate).toEqual(date);
        });

        it("should only fire after two seconds of no events", (done) => {
            const mockReset = jest.fn();
            const wrapper = shallowMount(ImagePage);
            wrapper.vm.reset = mockReset;

            wrapper.vm.debounce(new Date()); //call a few times to ensure debounce calls once
            wrapper.vm.debounce(new Date());
            wrapper.vm.debounce(new Date());
            wrapper.vm.debounce(new Date());

            setTimeout(() => {
                expect(mockReset).toHaveBeenCalledTimes(1);
                done();
            }, 2050);
        });
    });

    describe("slider event", () => {
        it("should trigger debounce event", async () => {
            const date = new Date();
            const mockDebounceEvent = jest.fn();
            const wrapper = shallowMount(ImagePage);
            //for some reason, mocking debounceEvent causes it to never be called... 
            wrapper.setData({ debounce: mockDebounceEvent });
            wrapper.vm.$nextTick();
            
            wrapper.find(Slider).vm.$emit("date-change", date );

            expect(mockDebounceEvent).toHaveBeenCalledTimes(1);
            expect(mockDebounceEvent).toHaveBeenCalledWith(date);
        });
    });
});
