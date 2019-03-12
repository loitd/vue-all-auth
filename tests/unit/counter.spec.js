import Vue from "vue/dist/vue"
import Counter from "../../components/Counter.vue"

test("Test Vue file for element", ()=>{
    // construct new instance
    // const vm = new Vue({
    //     template: '<div id="app">holly</div>',
    //     data: {}
    // }).$mount()

    // construct Vue instance from component
    const vm = new Vue(Counter).$mount()
    expect(vm.$el.innerHTML).toEqual(expect.stringContaining('Increment'))

})

test("Test change data in Vue", ()=>{
    // construct Vue instance from component
    const vm = new Vue(Counter).$mount()
    // change
    vm.count = 577
    // wait for nextTick
    Vue.nextTick(function(){
        expect(vm.$el.innerHTML).toEqual(expect.stringContaining('577'))
    })
    
})
