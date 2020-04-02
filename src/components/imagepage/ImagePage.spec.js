/* eslint-env jest */
import { shallowMount } from "@vue/test-utils";
import ImagePage from "./ImagePage";

describe("image page", () => {
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
                console.table(array)
                console.table(newArray);

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

});
