/* Copyright (c) 2025 Mohammad Sheraj *//* Discover is licensed under India PSL v1. You can use this software according to the terms and conditions of the India PSL v1. You may obtain a copy of India PSL v1 at: https://github.com/abirusabil123/discover/blob/main/IndiaPSL1 THIS SOFTWARE IS PROVIDED ON AN “AS IS” BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE. See the India PSL v1 for more details. */

package com.example.discover.ui.components

import android.content.ActivityNotFoundException
import android.content.Intent
import android.graphics.Bitmap
import android.view.MotionEvent
import android.view.View
import android.webkit.JavascriptInterface
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.activity.compose.BackHandler
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.asPaddingValues
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBars
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.LinearProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.unit.DpOffset
import androidx.compose.ui.unit.dp
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.net.toUri
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.example.discover.ui.theme.PrimaryGreen
import com.example.discover.ui.theme.SurfaceDark
import com.example.discover.viewmodel.DiscoverViewModel

class MediaExtractor {
    var onExtracted: ((String, String) -> Unit)? = null

    @JavascriptInterface
    fun onMediaExtracted(url: String, type: String) {
        onExtracted?.invoke(url, type)
    }
}

@Composable
fun WebViewArea(
    viewModel: DiscoverViewModel,
    webView: WebView,
    mediaExtractor: MediaExtractor,
    url: String?,
    onUrlChanged: (String) -> Unit,
    onCloseArea: () -> Unit,
    onWebViewHistoryBack: () -> Unit
) {
    val isWebViewLoading by viewModel.isWebViewLoading.collectAsStateWithLifecycle()
    var webViewProgress by remember { mutableIntStateOf(0) }
    val context = LocalContext.current

    var menuExpanded by remember { mutableStateOf(false) }
    var menuUrl by remember { mutableStateOf("") }
    var menuType by remember { mutableIntStateOf(0) }
    var isExtractedVideo by remember { mutableStateOf(false) }
    var lastTouchX by remember { mutableFloatStateOf(0f) }
    var lastTouchY by remember { mutableFloatStateOf(0f) }
    val density = LocalDensity.current

    mediaExtractor.onExtracted = { url, type ->
        webView.post {
            menuUrl = url
            isExtractedVideo = type == "video"
            menuType =
                if (type == "video") WebView.HitTestResult.UNKNOWN_TYPE else WebView.HitTestResult.IMAGE_TYPE
            menuExpanded = true
        }
    }

    LaunchedEffect(webView, url) {
        val targetUrl = url ?: "about:blank"
        if (targetUrl.lowercase().endsWith(".pdf")) {
            try {
                // Show a message in WebView instead of a blank screen
                val fileName = targetUrl.substringAfterLast("/")
                val htmlData = """
<html>
<body style='background:black;color:white;margin:0;display:flex;align-items:center;justify-content:center;min-height:100vh;flex-direction:column;'>
    <h1>Opening PDF...</h1>
    <p>${fileName}</p>
</body>
</html>""".trimIndent()
                webView.loadData(htmlData, "text/html", "UTF-8")

                val intent = Intent(Intent.ACTION_VIEW, targetUrl.toUri())
                intent.setDataAndType(targetUrl.toUri(), "application/pdf")
                context.startActivity(intent)

                return@LaunchedEffect
            } catch (e: ActivityNotFoundException) {
                e.printStackTrace()
                Toast.makeText(context, "No PDF app found." + e.message, Toast.LENGTH_SHORT).show()
            }
        }
        if (webView.url != targetUrl) {
            webView.loadUrl(targetUrl)
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(
                bottom = WindowInsets.navigationBars.asPaddingValues().calculateBottomPadding()
            )
    ) {
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .height(4.dp)
        ) {
            // 2. The AnimatedVisibility now lives inside the Box.
            //    It no longer needs a height modifier itself.
            androidx.compose.animation.AnimatedVisibility(visible = webViewProgress in 1..99) {
                LinearProgressIndicator(
                    progress = { webViewProgress / 100f },
                    modifier = Modifier.fillMaxWidth(),
                    color = PrimaryGreen,
                    trackColor = SurfaceDark.copy(alpha = 0.3f)
                )
            }
        }

        Box(modifier = Modifier.fillMaxSize()) {
            // The AndroidView now simply PLACES the existing WebView.
            AndroidView(factory = { webView }, modifier = Modifier.fillMaxSize(), update = { view ->
                // The update block ensures the clients are correctly set.
                view.webChromeClient = object : WebChromeClient() {
                    override fun onProgressChanged(v: WebView?, newProgress: Int) {
                        if (!isWebViewLoading || webView.url != "about:blank") {
                            webViewProgress = newProgress
                        }
                    }

                    override fun onReceivedTitle(view: WebView?, title: String?) {
                        super.onReceivedTitle(view, title)
                        // onReceivedTitle is a very reliable callback that fires after most
                        // navigation events, including those via JavaScript's History API.
                        // We use it as a trigger to ask the WebView for its current URL.
                        view?.url?.let { currentUrl ->
                            onUrlChanged(currentUrl)
                        }
                    }
                }
                view.webViewClient = object : WebViewClient() {
                    override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                        super.onPageStarted(view, url, favicon)
                        // Report the URL as soon as navigation starts.
                        // This is good for immediate feedback.
                        url?.let { onUrlChanged(it) }
                    }

                    override fun onPageFinished(view: WebView?, url: String?) {
                        super.onPageFinished(view, url)
                        // Also report the URL when the page finishes loading.
                        // This captures the final URL after any redirects.
                        url?.let { onUrlChanged(it) }

                        // The WebView has finished a draw pass, so it's safe to make it visible.
                        if (isWebViewLoading) {
                            viewModel.onWebViewPageVisible()
                            // Flicker is very annoying. It was better before.
                            webView.visibility = View.VISIBLE
                            webView.setBackgroundColor(Color.White.toArgb())
                        }
                    }

                    override fun shouldOverrideUrlLoading(
                        view: WebView?, request: WebResourceRequest?
                    ): Boolean {
                        val requestedUrl = request?.url ?: return false
                        if (requestedUrl.scheme != "http" && requestedUrl.scheme != "https") {
                            try {
                                context.startActivity(Intent(Intent.ACTION_VIEW, requestedUrl))
                                return true
                            } catch (e: ActivityNotFoundException) {
                                e.printStackTrace()
                                Toast.makeText(
                                    context, "No app found to open this URL.", Toast.LENGTH_SHORT
                                ).show()
                                return true
                            }
                        }
                        return false
                    }
                }

                view.setOnTouchListener { v, event ->
                    if (event.action == MotionEvent.ACTION_DOWN) {
                        lastTouchX = event.x
                        lastTouchY = event.y
                    }
                    v.performClick()
                    false
                }

                view.setOnLongClickListener {
                    val result = view.hitTestResult
                    val type = result.type
                    val extra = result.extra

                    if (extra != null && (type == WebView.HitTestResult.IMAGE_TYPE || type == WebView.HitTestResult.SRC_IMAGE_ANCHOR_TYPE || type == WebView.HitTestResult.SRC_ANCHOR_TYPE)) {
                        menuUrl = extra
                        menuType = type
                        isExtractedVideo = false
                        menuExpanded = true
                        return@setOnLongClickListener true
                    }

                    // Try Universal Extraction via JS
                    val script = """
                        (function() {
                            var x = $lastTouchX / window.devicePixelRatio;
                            var y = $lastTouchY / window.devicePixelRatio;
                            var el = document.elementFromPoint(x, y);
                            if (!el) return;
                            
                            function findMedia(e) {
                                if (!e) return null;
                                if (e.tagName === 'IMG') return { url: e.src, type: 'image' };
                                if (e.tagName === 'VIDEO') return { url: e.src || e.currentSrc, type: 'video' };
                                if (e.style && e.style.backgroundImage) {
                                    var bg = e.style.backgroundImage;
                                    var url = bg.match(/url\(["']?([^"']*)["']?\)/);
                                    if (url) return { url: url[1], type: 'image' };
                                }
                                return findMedia(e.parentElement);
                            }
                            
                            var media = findMedia(el);
                            if (media && media.url) {
                                MediaExtractor.onMediaExtracted(media.url, media.type);
                            }
                        })();
                    """.trimIndent()
                    view.evaluateJavascript(script, null)

                    false
                }
            })

            DropdownMenu(
                expanded = menuExpanded,
                onDismissRequest = { menuExpanded = false },
                offset = with(density) { DpOffset(lastTouchX.toDp(), lastTouchY.toDp()) }) {
                val isImage =
                    menuType == WebView.HitTestResult.IMAGE_TYPE || menuType == WebView.HitTestResult.SRC_IMAGE_ANCHOR_TYPE
                val isLink =
                    menuType == WebView.HitTestResult.SRC_ANCHOR_TYPE || menuType == WebView.HitTestResult.SRC_IMAGE_ANCHOR_TYPE
                val isVideo = isExtractedVideo || menuUrl.lowercase().let {
                    it.endsWith(".mp4") || it.endsWith(".webm") || it.endsWith(".ogg") || it.endsWith(
                        ".mkv"
                    ) || it.endsWith(".m4v") || it.endsWith(".3gp")
                }

                if (isImage) {
                    DropdownMenuItem(text = { Text("Save Image") }, onClick = {
                        viewModel.downloadMedia(menuUrl, webView.settings.userAgentString)
                        menuExpanded = false
                    })
                }

                if (isVideo) {
                    DropdownMenuItem(text = { Text("Save Video") }, onClick = {
                        viewModel.downloadMedia(menuUrl, webView.settings.userAgentString)
                        menuExpanded = false
                    })
                }

                if (isLink) {
                    DropdownMenuItem(text = { Text("Copy Link") }, onClick = {
                        viewModel.copyToClipboard(menuUrl)
                        menuExpanded = false
                    })
                }
            }
        }
    }

    BackHandler(enabled = true) {
        if (webView.canGoBack()) {
            webView.goBack()
            onWebViewHistoryBack()
        } else {
            onCloseArea()
        }
    }
}
