<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      let iconfont = icon + ' iconfont iconfont-sidebar';
      vnodes.push(<i class={ iconfont }></i>)
    }

    if (title) {
      vnodes.push(<span slot='title' class="margin-left">{(title)}</span>)
    }

    return vnodes
  }
}
</script>
<style lang="scss" scoped>
  .margin-left{
    margin-left: 16px;
  }
  .iconfont-sidebar{
    color: #FFF;
  }
</style>

