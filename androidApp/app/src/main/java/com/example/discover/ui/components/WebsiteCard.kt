/* Copyright (c) 2025 Mohammad Sheraj *//* Discover is licensed under India PSL v1. You can use this software according to the terms and conditions of the India PSL v1. You may obtain a copy of India PSL v1 at: https://github.com/abirusabil123/discover/blob/main/IndiaPSL1 THIS SOFTWARE IS PROVIDED ON AN “AS IS” BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE. See the India PSL v1 for more details. */

package com.example.discover.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.selection.SelectionContainer
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.discover.data.Link
import com.example.discover.ui.theme.BorderColor
import com.example.discover.ui.theme.PrimaryGreen
import com.example.discover.ui.theme.SurfaceDark
import com.example.discover.ui.theme.TextPrimary
import com.example.discover.ui.theme.TextSecondary

@Composable
fun LinkCard(
    link: Link, onLikeClick: () -> Unit, onDislikeClick: () -> Unit, onLinkClick: () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp), colors = CardDefaults.cardColors(
            containerColor = SurfaceDark
        ), border = androidx.compose.foundation.BorderStroke(1.dp, BorderColor)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            // Link name
            Text(
                text = link.name,
                style = MaterialTheme.typography.headlineSmall,
                color = TextPrimary,
                fontWeight = FontWeight.Bold
            )

            Spacer(modifier = Modifier.height(8.dp))

            Spacer(modifier = Modifier.height(8.dp))

            // Description
            Text(
                text = link.description,
                style = MaterialTheme.typography.bodyMedium,
                color = TextPrimary,
                fontSize = 14.sp
            )

            // Tags
            Text(
                text = link.tags.joinToString(" "),
                style = MaterialTheme.typography.bodyMedium,
                color = TextSecondary,
                fontSize = 12.sp
            )

            Spacer(modifier = Modifier.height(12.dp))

            // URL

            SelectionContainer {
                Text(
                    text = link.url,
                    style = MaterialTheme.typography.bodySmall,
                    color = PrimaryGreen,
                    fontSize = 12.sp,
                    textAlign = TextAlign.Center,
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(
                            color = PrimaryGreen.copy(alpha = 0.1f),
                            shape = RoundedCornerShape(4.dp)
                        )
                        .padding(4.dp)
                        .clickable(
                            onClick = onLinkClick // Use the passed-in onLinkClick lambda
                        )
                )
            }

            Spacer(modifier = Modifier.height(16.dp))

            // Stats and action buttons
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Dislikes button
                Button(
                    onClick = onDislikeClick, colors = ButtonDefaults.buttonColors(
                        containerColor = Color.Transparent, contentColor = TextPrimary
                    ), border = androidx.compose.foundation.BorderStroke(1.dp, BorderColor)
                ) {
                    Text("👎 ${link.dislikesMobile}")
                }

                // Views count
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "${link.views + 1}",
                        style = MaterialTheme.typography.headlineSmall,
                        color = PrimaryGreen,
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = "views",
                        style = MaterialTheme.typography.bodySmall,
                        color = TextSecondary,
                        fontSize = 12.sp
                    )
                }

                // Likes button
                Button(
                    onClick = onLikeClick, colors = ButtonDefaults.buttonColors(
                        containerColor = Color.Transparent, contentColor = TextPrimary
                    ), border = androidx.compose.foundation.BorderStroke(1.dp, BorderColor)
                ) {
                    Text("👍 ${link.likesMobile}")
                }
            }
        }
    }
} 