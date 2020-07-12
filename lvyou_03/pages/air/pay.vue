<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        <!-- Number().toFixed(2) 保留2位小数点 -->
        支付总金额
        <span class="pay-price">￥ {{ Number(detail.price).toFixed(2) }}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import qrcode from "qrcode";
export default {
  data() {
    return {
      // 订单详细信息
      detail: {},
      // 定时器的对象
      timer: ""
    };
  },
  mounted() {
    // 因为使用了vuex,有的数据通过本地过来的,需要时间,这里加个定时器
    setTimeout(async () => {
      //调用接口获取支付链接,生成二维码
      const res = await this.weixinCode();
      this.detail = res.data;
      // 使用qrcode插件,将支付链接转为二维码
      const canvas = document.querySelector("#qrcode-stage");
      // 参数1:放二维码的canvas元素,参数2:支付链接,参数3:宽度配置项
      qrcode.toCanvas(canvas, this.detail.payInfo.code_url, { width: 200 });
    }, 50);
    // 使用轮询(3秒钟发送一次请求)查看用户是否支付,如果支付了就提示支付成功,跳转页面
    this.timer = setInterval(() => {
      // 查询是否支付接口
      this.$axios({
        url: "/airorders/checkpay",
        method: "POST",
        headers: {
          Authorization: `Bearer ` + this.$store.state.user.userInfo.token
        },
        data: {
          id: this.detail.id, // 订单id
          nonce_str: this.detail.price, // 订单金额
          out_trade_no: this.detail.orderNo
        }
      }).then(res => {
        if (res.data.statusTxt == "支付完成") {
          this.$message.success("订单支付成功");
          //  清除定时器
          clearInterval(this.timer);
          //  跳转到别的页面
          this.$router.push("/air");
        }
      });
    }, 5000);
  },
  methods: {
    //   请求预支付接口,获取支付链接
    weixinCode() {
      return this.$axios({
        url: "/airorders/" + this.$route.query.id,
        headers: {
          Authorization: `Bearer ` + this.$store.state.user.userInfo.token
        }
      });
    }
  },
  destroyed() {
    //   页面销毁也清除定时器
    clearInterval(this.timer);
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>