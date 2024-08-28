"use client";

import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const AddBlog = ({
  isModalOpen,
  setModalOpen,
  loading,
  formData,
  setFormData,
  handleAddOrUpdateBlog,
  editBlogId,
}) => {
  return (
    <Fragment>
      <div>
        <Button onClick={() => setModalOpen(true)}>Add New Blog</Button>
      </div>
      <Dialog
        open={isModalOpen}
        onOpenChange={() => {
          setModalOpen(false);
          setFormData({
            title: "",
            description: "",
          });
          //  setCurrentEditedBlogID(null);
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editBlogId ? "Edit Blog" : "Add New Blog"}{" "}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                name="title"
                placeholder="Enter blog title"
                value={formData.title}
                onChange={(event) => setFormData({
                  ...formData,
                  title: event.target.value,
                })}
                id="title"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                name="description"
                value={formData.description}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    description: event.target.value,
                  })
                }
                id="description"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                handleAddOrUpdateBlog();
              }}
              type="button"
            >
              {loading ? "Saving changes" : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default AddBlog;
