package com.appshiper

import android.content.Intent
import android.os.Bundle
import com.facebook.react.ReactActivity
import vn.zalopay.sdk.ZaloPaySDK

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    ZaloPaySDK.getInstance().onResult(intent)
  }

  override fun onNewIntent(intent: Intent) {
    super.onNewIntent(intent)
    ZaloPaySDK.getInstance().onResult(intent)
  }

  override fun getMainComponentName(): String? {
    return "AppShiper" // Thay thế "YourMainComponentName" bằng tên component chính của bạn
  }
}
