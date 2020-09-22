<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                            type="password"
                            placeholder="password"
                            v-model="param.password"
                            @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {
        login
    } from '../../api/login';

    export default {
        data: function() {
            return {
                param: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
                }
            };
        },
        methods: {
            async submitForm() {
                let data = {
                    phone: this.param.username,
                    password: this.param.password
                };
                const res = await login(data);
                console.log(res);
                this.$alert_res(res, this);
                if (res.msg === '成功') {
                    // this.$message.success('登录成功');
                    let role = res.data.list[0].type;
                    console.log(role);
                    let phone = res.data.list[0].phone;
                    let picture = res.data.list[0].picture;
                    sessionStorage.setItem('ms_username', phone);
                    sessionStorage.setItem('user_roles', role.toString());
                    sessionStorage.setItem('user_avator', picture);
                    sessionStorage.setItem('user_name', res.data.list[0].username);
                    sessionStorage.setItem('user_id', res.data.list[0].id);
                    this.$router.push('/');
                }
            }
        }
    };
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>
