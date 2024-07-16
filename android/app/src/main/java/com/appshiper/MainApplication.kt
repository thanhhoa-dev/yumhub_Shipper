package com.appshiper

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.flipper.ReactNativeFlipper
import com.facebook.soloader.SoLoader

import vn.zalopay.sdk.ZaloPaySDK
import vn.zalopay.sdk.Environment

class MainApplication : Application(), ReactApplication {

    override val reactNativeHost: ReactNativeHost =
            object : DefaultReactNativeHost(this) {
                override fun getPackages(): List<ReactPackage> {
                    val packages = PackageList(this).packages.toMutableList()
                    // Thêm PayZaloReactPackage vào danh sách các package
                    packages.add(PayZaloReactPackage())
                    return packages
                }

                override fun getJSMainModuleName(): String = "index"

                override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

                override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
                override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
            }

    override val reactHost: ReactHost
        get() = getDefaultReactHost(this.applicationContext, reactNativeHost)

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)
        ZaloPaySDK.init(2554, Environment.SANDBOX)

        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            // Nếu bạn đã chọn sử dụng Kiến trúc Mới, chúng ta sẽ tải điểm nhập gốc cho ứng dụng này.
            load()
        }

        ReactNativeFlipper.initializeFlipper(this, reactNativeHost.reactInstanceManager)
    }

    // Reinit ZPDK nếu muốn thanh toán bằng một AppID khác
    private fun reinitZaloPaySDK(appID: Int, environment: Environment) {
        ZaloPaySDK.tearDown()
        ZaloPaySDK.init(appID, environment)
    }
}
