/* Copyright (c) 2025 Mohammad Sheraj *//* Discover is licensed under India PSL v1. You can use this software according to the terms and conditions of the India PSL v1. You may obtain a copy of India PSL v1 at: https://github.com/abirusabil123/discover/blob/main/IndiaPSL1 THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE. See the India PSL v1 for more details. */

package com.example.discover.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.HorizontalDivider
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.LinkAnnotation
import androidx.compose.ui.text.SpanStyle
import androidx.compose.ui.text.TextLinkStyles
import androidx.compose.ui.text.buildAnnotatedString
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.text.withLink
import androidx.compose.ui.unit.dp
import com.example.discover.ui.theme.BackgroundDark
import com.example.discover.ui.theme.Spacing
import com.example.discover.ui.theme.TextPrimary
import com.example.discover.ui.theme.TextSecondary
import com.example.discover.viewmodel.DiscoverViewModel

@Composable
fun SettingsScreen(
    viewModel: DiscoverViewModel, onBack: () -> Unit, statusBarPadding: PaddingValues
) {
    val tagsAllow by viewModel.tagsAllowlist.collectAsState()
    val tagsBlock by viewModel.tagsBlocklist.collectAsState()
    val urlsAllow by viewModel.urlsAllowlist.collectAsState()
    val urlsBlock by viewModel.urlsBlocklist.collectAsState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundDark)
            .padding(statusBarPadding)
    ) {
        // Header
        Column(modifier = Modifier.fillMaxWidth()) {
            IconButton(
                onClick = onBack, modifier = Modifier.padding(start = Spacing.small)
            ) {
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                    contentDescription = "Back",
                    tint = TextPrimary
                )
            }
            Text(
                text = "⚙️ Settings",
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(bottom = Spacing.medium),
                style = MaterialTheme.typography.headlineMedium,
                color = TextPrimary,
                fontWeight = FontWeight.Bold,
                textAlign = TextAlign.Center
            )
        }

        // Scrollable content area
        Column(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth()
                .verticalScroll(rememberScrollState())
                .padding(horizontal = Spacing.medium)
        ) {
            Button(
                onClick = { viewModel.resetFiltersToPositiveOnly() },
                modifier = Modifier.align(Alignment.CenterHorizontally),
                colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.secondary)
            ) {
                Text("Positive Only")
            }

            Spacer(modifier = Modifier.height(Spacing.medium))
            HorizontalDivider(color = Color.Gray.copy(alpha = 0.3f))
            Spacer(modifier = Modifier.height(Spacing.medium))

            Text(
                text = "Filter by Tags (comma separated):",
                style = MaterialTheme.typography.titleMedium,
                color = TextPrimary,
                modifier = Modifier.fillMaxWidth(),
                textAlign = TextAlign.Center
            )
            Spacer(modifier = Modifier.height(Spacing.small))
            FilterTextField(
                value = tagsAllow,
                label = "Allowlist",
                onValueChange = { viewModel.tagsAllowlist.value = it })
            FilterTextField(
                value = tagsBlock,
                label = "Blocklist",
                onValueChange = { viewModel.tagsBlocklist.value = it })

            Button(
                onClick = { viewModel.applyFilters() },
                modifier = Modifier.align(Alignment.CenterHorizontally),
                colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary)
            ) {
                Text("Apply Tags Filter")
            }

            Spacer(modifier = Modifier.height(Spacing.large))
            HorizontalDivider(color = Color.Gray.copy(alpha = 0.3f))
            Spacer(modifier = Modifier.height(Spacing.large))

            Text(
                text = "Filter by URLs (space separated):",
                style = MaterialTheme.typography.titleMedium,
                color = TextPrimary,
                modifier = Modifier.fillMaxWidth(),
                textAlign = TextAlign.Center
            )
            Spacer(modifier = Modifier.height(Spacing.small))
            FilterTextField(
                value = urlsAllow,
                label = "Allowlist",
                onValueChange = { viewModel.urlsAllowlist.value = it })
            FilterTextField(
                value = urlsBlock,
                label = "Blocklist",
                onValueChange = { viewModel.urlsBlocklist.value = it })

            Button(
                onClick = { viewModel.applyFilters() },
                modifier = Modifier.align(Alignment.CenterHorizontally),
                colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.primary)
            ) {
                Text("Apply URL Filter")
            }

            Spacer(modifier = Modifier.height(Spacing.large))
            HorizontalDivider(color = Color.Gray.copy(alpha = 0.3f))
            Spacer(modifier = Modifier.height(Spacing.large))

            Text(
                text = "Feedback:",
                style = MaterialTheme.typography.titleLarge,
                color = TextPrimary,
                fontWeight = FontWeight.Bold
            )

            val feedbackUrl = "https://github.com/abirusabil123/discover/issues"
            Text(
                text = buildAnnotatedString {
                    withLink(
                        LinkAnnotation.Url(
                            url = feedbackUrl, styles = TextLinkStyles(
                                style = SpanStyle(
                                    color = MaterialTheme.colorScheme.primary,
                                    textDecoration = TextDecoration.Underline
                                )
                            )
                        )
                    ) {
                        append(feedbackUrl)
                    }
                })

            Spacer(modifier = Modifier.height(32.dp))
        }
    }
}

@Composable
fun FilterTextField(value: String, label: String, onValueChange: (String) -> Unit) {
    OutlinedTextField(
        value = value,
        onValueChange = onValueChange,
        label = { Text(label) },
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = Spacing.small),
        colors = OutlinedTextFieldDefaults.colors(
            focusedTextColor = TextPrimary,
            unfocusedTextColor = TextPrimary,
            focusedLabelColor = MaterialTheme.colorScheme.primary,
            unfocusedLabelColor = TextSecondary,
            focusedBorderColor = MaterialTheme.colorScheme.primary,
            unfocusedBorderColor = Color.Gray
        )
    )
}