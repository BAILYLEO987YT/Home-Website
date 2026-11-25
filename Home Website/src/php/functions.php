<?php
declare(strict_types=1);

// Renders a project's tag list. Each tag is a real <button> so it can be
// clicked, tabbed to and activated with Enter/Space. data-tag holds the
// raw tag value that the JS filter compares against.
function displayTags(array $tags): void {
    ?>
    <ul class="project-tags">
        <?php foreach ($tags as $tag): ?>
            <li>
                <button type="button" class="tag" data-tag="<?= htmlspecialchars($tag, ENT_QUOTES) ?>"
                    title="Show projects tagged &quot;<?= htmlspecialchars($tag, ENT_QUOTES) ?>&quot;">
                    <?= htmlspecialchars($tag) ?>
                </button>
            </li>
        <?php endforeach; ?>
    </ul>
    <?php
}

function displayProject(string $title, string $desc, array $tags, string $link): void {
    ?>
    <article class="project">
        <h3 class="project-title"><?= htmlspecialchars($title) ?></h3>
        <p class="project-desc"><?= htmlspecialchars($desc) ?></p>
        <?php displayTags($tags); ?>
        <?php if ($link !== ''): ?>
            <div class="project-links">
                <a href="<?= htmlspecialchars($link, ENT_QUOTES) ?>" class="project-link" target="_blank">Source →</a>
            </div>
        <?php endif; ?>
    </article>
    <?php
}

function displayServices(string $title, string $desc, array $img): void {
    ?>
    <article class="carousel-slide">
        <img src="<?= htmlspecialchars($img[0]);?>" alt="<?= htmlspecialchars($img[1]);?>">
        <h3><?= htmlspecialchars($title);?></h3>
        <p><?= htmlspecialchars($desc);?></p>
    </article>
    <?php
}
?>