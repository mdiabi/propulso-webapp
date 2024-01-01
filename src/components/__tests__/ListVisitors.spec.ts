import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils';
import ListVisitors from '../ListVisitors.vue';

describe('ListVisitors', () => {
  it('fetches visitors correctly', async () => {
    globalThis.fetch = async () => {
      const response = {
        ok: true,
        json: async () => ({
          paginated_visitors: [{ visitor_id: 'visitor1' }, { visitor_id: 'visitor2' }],
          total_visitors: 2,
        }),
      };

      return Promise.resolve(response as unknown as Response);
    };

    const wrapper = mount(ListVisitors);
    
    wrapper.vm.$options.methods.fetchVisitors.call(wrapper.vm);

    await new Promise(resolve => setTimeout(resolve, 100));

    expect(wrapper.vm.paginatedVisitors).toHaveLength(2);
    expect(wrapper.vm.totalVisitors).toBe(2);
    expect(wrapper.vm.error).toBeNull();
  });

  it('moves to the previous page correctly', async () => {
    const wrapper = mount(ListVisitors);
    wrapper.vm.$data.currentPage = 2;
    wrapper.vm.$data.totalVisitors = 20;
    wrapper.vm.$data.perPage = 10;
    wrapper.vm.$data.paginatedVisitors = [{ visitor_id: 'visitor1', visits: [] }, { visitor_id: 'visitor2', visits: [] }];

    await wrapper.vm.prevPage();

    expect(wrapper.vm.$data.currentPage).toBe(1);
  });

  it('moves to the next page correctly', async () => {
    const wrapper = mount(ListVisitors);
    wrapper.vm.$data.currentPage = 1;
    wrapper.vm.$data.totalVisitors = 20;
    wrapper.vm.$data.perPage = 10;
    wrapper.vm.$data.paginatedVisitors = [{ visitor_id: 'visitor1', visits: [] }, { visitor_id: 'visitor2', visits: [] }];

    await wrapper.vm.nextPage();

    expect(wrapper.vm.$data.currentPage).toBe(2);
  });
});