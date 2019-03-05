export const mixin = { // 订单项目
  data() {
    return {
      columns1: [
        {
          title: '项目名称',
          key: 'SFXMMC',
        },
        {
          title: '参考价格',
          key: 'DJ0000',
          render: (h, params) => h('span', { style: { color: 'red' } }, `￥${params.row.DJ0000}`),
        },
        {
          title: '所属科室',
          key: 'BMMC00',
        },
        {
          title: '类型',
          key: 'XMLB00',
          render: (h, params) => {
            if (params.row.XMLB00 === '1') {
              return h('span', {
                style: {
                  color: 'green',
                  fontWeight: 'bold',
                },
              }, '必选');
            }
            return h('div', {
            }, [
              h('Icon', {
                props: {
                  type: 'md-trash',
                  size: 30,
                  color: 'red',
                },
                on: {
                  click: () => {
                    this.remove(params.index);
                  },
                },
              }),
            ]);
          },
        },
      ],
    };
  },
};
export const mixin1 = { // 新增项目
  data() {
    return {
      columns1: [
        {
          title: '选择',
          type: 'selection',
        },
        {
          title: '项目名称',
          key: 'SFXMMC',
        },
        {
          title: '参考价格',
          key: 'DJ0000',
        },
        {
          title: '所属科室',
          key: 'BMMC00',
        },
      ],
    };
  },
};
export const mixin2 = {
  methods: {
    backhome() {
      this.$router.push('/home/personinfo');
    },
  },
};
