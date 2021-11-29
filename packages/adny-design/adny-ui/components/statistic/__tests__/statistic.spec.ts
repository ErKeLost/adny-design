import { nextTick } from "vue";
import { mount } from "@vue/test-utils";
import { AStatistic } from "../index";

describe("statistic test", () => {
  it("statistic init test", async () => {
    const wrapper = mount(AStatistic);
    expect(wrapper.element).toMatchSnapshot();
  });
  it("basic statistic title render", async () => {
    const wrapper = mount({
      components: {
        AStatistic,
      },
      template: `
        <a-statistic 
          title="Account Weekly Sales (CNY)"
          :precision="5"
        />
      `,
    });
    expect(wrapper.classes()).toContain("devui-statistic-title");
  });
  it("basic statistic value render", async () => {
    const wrapper = mount({
      components: {
        AStatistic,
      },
      template: `
        <a-statistic 
          title="Account Weekly Sales (CNY)"
          :value="999"
          :precision="5"
        />
      `,
    });
    expect(wrapper.classes()).toContain("devui-statistic-value");
  });
  it("in v-slot mode should render suffix", async () => {
    const wrapper = mount({
      components: {
        AStatistic,
      },
      template: `
        <a-statistic 
          title="Account Weekly Sales (CNY)"
          :value="999"
          :precision="5"
        >
          <template #suffix>
            <span>Im a suffix slot</span>
          </template>
        </a-statistic>
      `,
    });
    expect(wrapper.classes()).toContain("devui-statistic-suffix");
  });
  it("in v-slot mode should render prefix", async () => {
    const wrapper = mount({
      components: {
        AStatistic,
      },
      template: `
        <a-statistic 
          title="Account Weekly Sales (CNY)"
          :value="999"
          :precision="5"
        >
          <template #suffix>
            <span>Im a prefix slot</span>
          </template>
        </a-statistic>
      `,
    });
    expect(wrapper.classes()).toContain("devui-statistic-prefix");
  });
  it("should render correctly title", async () => {
    const wrapper = mount({
      components: {
        AStatistic,
      },
      template: `
        <a-statistic 
          title="Account Weekly Sales (CNY)"
          :value="999"
          :precision="5"
        >
          <template #title>
            DevUI
          </template>
        </a-statistic>
      `,
    });
    expect(wrapper.find(".devui-statistic-title").text()).toBe("DevUI");
  });
  it("should render correctly suffix", async () => {
    const wrapper = mount({
      components: {
        AStatistic,
      },
      template: `
        <a-statistic 
          title="Account Weekly Sales (CNY)"
          :value="999"
          :precision="5"
        >
          <template #suffix>
            DevUI
          </template>
        </a-statistic>
      `,
    });
    expect(wrapper.find(".devui-statistic-suffix").text()).toBe("DevUI");
  });
  it("should render correctly prefix", async () => {
    const wrapper = mount({
      components: {
        AStatistic,
      },
      template: `
        <a-statistic 
          title="Account Weekly Sales (CNY)"
          :value="999"
          :precision="5"
        >
          <template #prefix>
            DevUI
          </template>
        </a-statistic>
      `,
    });
    expect(wrapper.find(".devui-statistic-prefix").text()).toBe("DevUI");
  });
  it("should render correctly extra", async () => {
    const wrapper = mount({
      components: {
        AStatistic,
      },
      template: `
        <a-statistic 
          title="Account Weekly Sales (CNY)"
          :value="999"
          :precision="5"
        >
          <template #extra>
            <div class="devui-statistic-extra">
              DevUI
            </div>
          </template>
        </a-statistic>
      `,
    });
    expect(wrapper.find(".devui-statistic-extra").text()).toBe("DevUI");
  });
  it("should render correctly valueFrom", async () => {
    const wrapper = mount({
      components: {
        AStatistic,
      },
      template: `
        <a-statistic 
          title="Account Weekly Sales (CNY)"
          :valueFrom="9"
          :value="100"
        >
        </a-statistic>
      `,
    });
    expect(wrapper.find(".devui-statistic-value").text()).toBe("9");
  });
  it("should render correctly animation", async () => {
    const wrapper = mount({
      components: {
        AStatistic,
      },
      template: `
        <a-statistic 
          title="Account Weekly Sales (CNY)"
          :valueFrom="9"
          :value="100"
          animation
          start
        >
        </a-statistic>
      `,
    });
    await nextTick();
    setTimeout(() => {
      expect(wrapper.find(".devui-statistic-value").text()).toBe("100");
    }, 2000);
  });
  it("should render correctly duration", async () => {
    const wrapper = mount({
      components: {
        AStatistic,
      },
      template: `
        <a-statistic 
          title="Account Weekly Sales (CNY)"
          :valueFrom="9"
          :value="100"
          animation
          animation-duration="1000"
          start
        >
        </a-statistic>
      `,
    });
    await nextTick();
    setTimeout(() => {
      expect(wrapper.find(".devui-statistic-value").text()).toBe("100");
    }, 1000);
  });
  it("should render correctly titleStyle", async () => {
    const wrapper = mount({
      components: {
        AStatistic,
      },
      template: `
        <a-statistic 
          title="Account Weekly Sales (CNY)"
          :value="100"
          :title-style="{color: 'red'}"
        >
        </a-statistic>
      `,
    });
    expect(wrapper.find(".devui-statistic-title").style.color).toBe("red");
  });
  it("should render correctly contentStyle", async () => {
    const wrapper = mount({
      components: {
        AStatistic,
      },
      template: `
        <a-statistic 
          title="Account Weekly Sales (CNY)"
          :value="100"
          :title-style="{color: '#fba'}"
        >
        </a-statistic>
      `,
    });
    expect(wrapper.find(".devui-statistic-content").style.color).toBe("#fba");
  });
});
