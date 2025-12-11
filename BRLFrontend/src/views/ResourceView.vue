<script setup lang="ts">
import Upvote from '@/components/Upvote.vue';
import CommentFlagList from '@/components/commentlist/CommentFlagList.vue';
import FlagViewModal from '@/components/FlagViewModal.vue';
import CommentEditModal from '@/components/CommentEditModal.vue';
import VueFeather from 'vue-feather';
import { onMounted, ref, watch } from 'vue'
import { Resource, Comment, Flag } from '@/types';
import { useRoute, useRouter } from 'vue-router';
import CommentFlagEntry from '@/components/CommentFlagEntry.vue';
import { useResource } from '@/composables/useResource';
import { useUpvote } from '@/composables/useUpvote';
import { useComment } from '@/composables/useComment';
import { useFlag } from '@/composables/useFlag';
import dayjs from 'dayjs';

const resource = ref<Resource>();
const route = useRoute();
const router = useRouter();
const commentsScrollTarget = ref<HTMLElement | null>(null);
const activeTab = ref("comments");
const isFlagViewModalOpen = ref(false);
const isCommentEditModalOpen = ref(false);
const selectedComment = ref<Comment | null>(null);
const isDeleting = ref(false);

const getResourceById = useResource().getResourceById;
const listAllResources = useResource().listAllResources;
const { deleteResource } = useResource();
const { createUpvote, deleteUpvote } = useUpvote();
const { deleteComment } = useComment();
const { deleteFlag } = useFlag();

const scrollToTabs = () => {
  if (activeTab.value == "comments") {
    if (commentsScrollTarget.value) {
        commentsScrollTarget.value.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
        });
    }
  }
};


const scrollToComments = () => {
    activeTab.value = "comments";
    scrollToTabs();
}

const handleUpvote = () => {
    if (resource.value) { 
        console.log(resource.value)
        if (resource.value.upvotedByCurrentUser && resource.value.currentUserUpvoteId != undefined) {
            deleteUpvote(
                resource.value.id,
                resource.value.currentUserUpvoteId,
                () => {
                    if (resource.value) {
                        resource.value.upvoteCount -= 1;
                        resource.value.upvotedByCurrentUser = false;
                    }
                },
                () => {}
            )
        } else if (!resource.value.upvotedByCurrentUser) {
            createUpvote(
                resource.value.id,
                (newId) => {
                    if (resource.value) {
                        resource.value.upvoteCount += 1;
                        resource.value.upvotedByCurrentUser = true;
                        resource.value.currentUserUpvoteId = newId;
                    }
                },
                () => {}
            )
        }
    }
}

function refresh() {
    getResourceById(
        Number(route.params.id),
        (res) => resource.value = res,
        (reason) => resource.value = undefined,
    )
}

watch(
    () => route.params.id,
    (newId, _oldId) => {
        getResourceById(
            Number(newId),
            (res) => resource.value = res,
            (reason) => resource.value = undefined,
        )
    }
)


const handleEdit = () => {
    if (resource.value) {
        router.push({
            name: 'editResource',
            params: { id: resource.value.id }
        });
    }
}

const handleDelete = () => {
    if (resource.value && confirm('Are you sure you want to delete this resource? This action cannot be undone.')) {
        isDeleting.value = true;
        deleteResource(
            resource.value.id,
            () => {
                isDeleting.value = false;
                router.push({ name: 'home' });
            },
            (reason) => {
                isDeleting.value = false;
                console.error('Failed to delete resource:', reason);
                alert('Failed to delete resource. Please try again.');
            }
        );
    }
}

onMounted(() => {
    refresh();
})

const formatDate = (date: string | Date) => {
    return dayjs(date).format('MM/DD/YYYY');
};

const handleCommentEdit = (comment: Comment | Flag) => {
    if (comment.constructor.name === 'Comment') {
        selectedComment.value = comment as Comment;
        isCommentEditModalOpen.value = true;
    }
};

const handleCommentDelete = (record: Comment | Flag) => {
    if (!resource.value) return;

    if (confirm('Are you sure you want to delete this? This action cannot be undone.')) {
        if (record.constructor.name === 'Comment') {
            deleteComment(
                resource.value.id,
                record.id,
                () => {
                    refresh();
                },
                (reason) => {
                    console.error('Failed to delete comment:', reason);
                    alert('Failed to delete comment. Please try again.');
                }
            );
        } else {
            deleteFlag(
                resource.value.id,
                record.id,
                () => {
                    refresh();
                },
                (reason) => {
                    console.error('Failed to delete flag:', reason);
                    alert('Failed to delete flag. Please try again.');
                }
            );
        }
    }
};

const handleCommentEditSubmitted = () => {
    isCommentEditModalOpen.value = false;
    selectedComment.value = null;
    refresh();
};

</script>

<template>
  <div v-if="resource != undefined" class="resource-view">
    <div class="flag-warning" v-if="resource.reviewFlags.length > 0" @click="refresh">
        <p v-if="resource.reviewFlags.length > 1">
            <b>Warning! This resource has been flagged {{ resource.reviewFlags.length }} times!</b>
        </p>
        <p v-if="resource.reviewFlags.length == 1">
            <b>Warning! This resource has been flagged {{ resource.reviewFlags.length }} time!</b>
        </p>
    </div>
    <div class="resource-card">
        <div class="resource-action-row">
            <Upvote class="resource-action-item" :is-upvoted="resource.upvotedByCurrentUser" :count="resource.upvoteCount" @upvoted="handleUpvote"/>
            <div class="resource-action-item resource-comment-action">
                <button class="resource-comment-button" @click="scrollToComments">
                    <VueFeather type="message-circle"/>
                </button>
                {{ resource.comments.length }}
            </div>
            <div class="resource-action-item resource-flag-action">
                <button class="resource-flag-button" @click="isFlagViewModalOpen = true">
                    <VueFeather type="flag"/>
                </button>
                {{ resource.reviewFlags.length }}
            </div>
            <div v-if="resource.currentUserCanDelete" class="resource-action-item resource-edit-action">
                <button class="resource-edit-button" @click="handleEdit" :disabled="isDeleting">
                    <VueFeather type="edit-2"/>
                </button>
            </div>
            <div v-if="resource.currentUserCanDelete" class="resource-action-item resource-delete-action">
                <button class="resource-delete-button" @click="handleDelete" :disabled="isDeleting">
                    <VueFeather type="trash-2"/>
                </button>
            </div>
        </div>
    <div class="resource-header">
        <div>
            <h2 class="resource-title">
                {{ resource.title }}
                <span v-if="resource.isEdited" class="edited-tag">edited</span>
            </h2>
            <div class="resource-subtitle-row">
                <p>
                    <span class="resource-subtitle" >
                        <span class="resource-creator">Creator: {{ resource.firstName }} {{ resource.lastName }}</span>
                        <span class="resource-date"> · {{ formatDate(resource.creationDate) }}</span>
                    </span>
                </p>
            </div>
        </div>  
    </div>
        <p class="resource-url">Resource Link: <a class="resource-url-link" :href="resource.url">{{ resource.url }}</a></p>
        <p class="resource-description">{{ resource.description }}</p>
    </div>
    <div class="comments-container" ref="commentsScrollTarget" v-show="activeTab == 'comments'">
        <div class="comments-box">
            <CommentFlagEntry type="comment" :handle-successful-submit="refresh" :resource-id="resource.id"/>
            <div v-if="resource.comments.length === 0" class="no-comments-message">
                No comments...
            </div>
            <CommentFlagList 
                v-else 
                :records="resource.comments" 
                :resource-id="resource.id"
                @edit="handleCommentEdit"
                @delete="handleCommentDelete"
            />
        </div>
    </div>
    
    <FlagViewModal 
        :resource-id="resource.id" 
        :flags="resource.reviewFlags"
        :is-open="isFlagViewModalOpen"
        @close="isFlagViewModalOpen = false"
        @submitted="refresh"
    />

    <CommentEditModal
        :resource-id="resource.id"
        :comment="selectedComment"
        :is-open="isCommentEditModalOpen"
        @close="isCommentEditModalOpen = false"
        @submitted="handleCommentEditSubmitted"
    />
  </div>
  <p v-else>Resource not available</p>
</template>

<style scoped>
@import '../assets/animations.css';
@import '../assets/buttons.css';
@import './styles/ResourceView.css';
</style>
